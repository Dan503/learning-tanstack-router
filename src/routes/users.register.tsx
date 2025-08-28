import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'

import z, { type ZodError } from 'zod/v4'

const userRegistrationSchema = z
	.object({
		name: z.string().min(1, 'Username is required'),
		email: z.email('Please enter a valid email'),
		age: z.number().min(18, 'Ypu must be over the age of 18').nullable(),
		birthdate: z
			.date()
			.max(
				new Date(
					`${new Date().getFullYear() - 18}-${new Date().getMonth()}-${new Date().getDate()}`,
				),
				'Date suggests that you are younger than 18 years old',
			)
			.nullable(),
		isMarried: z.boolean(),
		nationality: z.enum(['AUS', 'Canada', 'USA', 'UK']),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters long'),
		confirmationPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmationPassword, {
		message: 'Passwords do not match',
		path: ['confirmationPassword'],
	})

type UserRegister = z.infer<typeof userRegistrationSchema>

export const Route = createFileRoute('/users/register')({
	component: RegistrationForm,
})

const defaultFormValues: UserRegister = {
	age: null,
	birthdate: null,
	confirmationPassword: '',
	email: '',
	isMarried: false,
	name: '',
	nationality: 'AUS',
	password: '',
}

function Errors({ errors }: { errors: Array<any> }) {
	const zodErrors = errors as Array<ZodError<any>>
	return zodErrors.filter(Boolean).map((err) => {
		const errorMessage =
			typeof err === 'string' ? err : (err.message ?? 'An error occured')
		return (
			<p key={errorMessage} className="text-red-400">
				{errorMessage}
			</p>
		)
	})
}

function RegistrationForm() {
	const form = useForm({
		defaultValues: defaultFormValues,
		validators: {
			onChange: userRegistrationSchema,
		},
		onSubmit: async ({ value }) => {
			console.log(value)
			alert(JSON.stringify(value, null, 3))
		},
	})

	return (
		<form
			className="p-2 grid gap-2"
			onSubmit={(e) => {
				e.preventDefault()
				form.handleSubmit()
			}}
		>
			<h1>Register</h1>

			<form.Field name="name">
				{(field) => (
					<>
						<label htmlFor="name">Name</label>
						<input
							type="text"
							name="name"
							id="name"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field name="email">
				{(field) => (
					<>
						<label htmlFor="email">Email</label>
						<input
							type="email"
							name="email"
							id="email"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
							onBlur={field.handleBlur}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field name="age">
				{(field) => (
					<>
						<label htmlFor="Age">Age</label>
						<input
							type="number"
							name="age"
							id="age"
							value={field.state.value ?? ''}
							onChange={(e) =>
								field.handleChange(e.target.valueAsNumber)
							}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field name="birthdate">
				{(field) => (
					<>
						<label htmlFor="birthdate">Birth date</label>
						<input
							type="date"
							name="birthdate"
							id="birthdate"
							value={
								field.state.value?.toISOString().split('T')[0]
							}
							onChange={(e) => {
								field.handleChange(e.target.valueAsDate)
							}}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field name="isMarried">
				{(field) => (
					<>
						<label htmlFor="isMarried">
							<input
								type="checkbox"
								name="isMarried"
								id="isMarried"
								checked={field.state.value}
								onChange={(e) =>
									field.handleChange(e.target.checked)
								}
							/>
							Are you married?
						</label>
					</>
				)}
			</form.Field>

			<form.Field name="nationality">
				{(field) => (
					<>
						<label htmlFor="nationality">Nationality</label>
						<select
							name="nationality"
							id="nationality"
							value={field.state.value}
							onChange={(e) =>
								field.handleChange(
									e.target.value as typeof field.state.value,
								)
							}
						>
							<option value="Aus">Aus</option>
							<option value="Canada">Canada</option>
							<option value="UK">UK</option>
							<option value="USA">USA</option>
						</select>
					</>
				)}
			</form.Field>

			<form.Field
				name="password"
				validators={{
					onChange: ({ value }) =>
						value.length < 8 &&
						'Password must be at least 8 characters long',
				}}
			>
				{(field) => (
					<>
						<label htmlFor="password">Password</label>
						<input
							type="password"
							name="password"
							id="password"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field
				name="confirmationPassword"
				validators={{
					onChangeListenTo: ['password'],
					onChange: ({ value, fieldApi }) =>
						value !== fieldApi.form.getFieldValue('password') &&
						'Passwords do not match',
				}}
			>
				{(field) => (
					<>
						<label htmlFor="confirmPassword">
							Confirm password
						</label>
						<input
							type="password"
							name="confirmPassword"
							id="confirmPassword"
							value={field.state.value}
							onChange={(e) => field.handleChange(e.target.value)}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<button className="p-2 border-2 rounded-md bg-slate-800 border-slate-600">
				Register
			</button>
		</form>
	)
}
