import { createFileRoute, useRouter } from '@tanstack/react-router'
import { createServerFn } from '@tanstack/react-start'
import fs from 'fs'
import * as z from 'zod'
// import { zfd } from 'zod-form-data'

const objectValidationSchema = z.object({
	amount: z.number(),
	isAdded: z.boolean(),
})

// // This would be good except `zfd.checkbox()` throws an error on boolean
// // https://github.com/airjp73/rvf/issues/457
// const formValidationSchema = zfd.formData({
// 	amount: zfd.numeric(),
// 	isAdded: zfd.checkbox(),
// })

const filePath = 'src/data/count.txt'

async function readCount() {
	return parseInt(await fs.promises.readFile(filePath, 'utf8'))
}

const getCount = createServerFn({ method: 'GET' }).handler(async () => {
	const count = await readCount()
	return count
})

const updateCount = createServerFn({ method: 'POST' })
	.validator(objectValidationSchema) // server side validation
	.handler(async ({ data }) => {
		if (!data.isAdded) {
			await fs.promises.writeFile(filePath, data.amount.toString())
			return data.amount
		}
		const oldAmount = await readCount()
		const newAmount = oldAmount + data.amount
		await fs.promises.writeFile(filePath, newAmount.toString())
		return newAmount
	})

export const Route = createFileRoute('/serverCounter')({
	component: RouteComponent,
	loader: () => getCount(),
})

function RouteComponent() {
	const count = Route.useLoaderData()
	const router = useRouter()
	return (
		<form
			className="flex flex-col gap-4 p-4"
			action={async (formData: FormData) => {
				const parsedData = objectValidationSchema.parse(
					Object.fromEntries(formData),
				)
				// const parsedData = formValidationSchema.parse(formData) // Client side validation
				console.log({ parsedData })
				await updateCount({ data: parsedData })
				router.invalidate()
			}}
		>
			<h1 className="font-bold text-4xl col-span-2">
				Hello "/serverCounter"!
			</h1>
			<p className="col-span-2">Current amount = {count}</p>
			<div className="flex gap-4 items-center">
				<label htmlFor="amount">Amount</label>
				<input
					id="amount"
					name="amount"
					defaultValue={count}
					required
					className="p-2"
					placeholder="enter new amount here"
				/>
				<input id="addSwitch" type="checkbox" name="isAdded" />
				<label htmlFor="addSwitch">Add instead of replace</label>
				<button type="submit" className="p-2 border">
					Update amount
				</button>
			</div>
		</form>
	)
}
