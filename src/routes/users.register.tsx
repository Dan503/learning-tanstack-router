import { useForm } from '@tanstack/react-form'
import { createFileRoute } from '@tanstack/react-router'
import type { User } from '../utils/users'

interface UserRegister extends User {
	age: number | undefined
	birthdate: Date | null
	isMarried: boolean
	nationality: string
	password: string
	confirmationPassword: string
}

export const Route = createFileRoute('/users/register')({
	component: RegistrationForm,
})

const defaultFormValues: UserRegister = {
	age: undefined,
	birthdate: null,
	confirmationPassword: '',
	email: '',
	id: 0,
	isMarried: false,
	name: '',
	nationality: '',
	password: '',
}

function Errors({ errors }: { errors: Array<string | boolean | undefined> }) {
	return errors.filter(Boolean).map((err) => (
		<p key={err as string} className="text-red-400">
			{err}
		</p>
	))
}

function RegistrationForm() {
	const form = useForm({
		defaultValues: defaultFormValues,
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

			<form.Field
				name="name"
				validators={{
					onBlur: ({ value }) => !value.trim() && 'Name is required',
				}}
			>
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

			<form.Field
				name="email"
				validators={{
					onBlur: ({ value }) => {
						const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
						return (
							!emailRegex.test(value) && 'Invalid email address'
						)
					},
				}}
			>
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

			<form.Field
				name="age"
				validators={{
					onChange: ({ value }) => {
						if (!value || isNaN(value)) {
							return 'An age is required'
						}

						if (value < 18) {
							return 'You must be over the age of 18'
						}
					},
				}}
			>
				{(field) => (
					<>
						<label htmlFor="Age">Age</label>
						<input
							type="number"
							name="age"
							id="age"
							value={field.state.value}
							onChange={(e) =>
								field.handleChange(e.target.valueAsNumber)
							}
						/>
						<Errors errors={field.state.meta.errors} />
					</>
				)}
			</form.Field>

			<form.Field
				name="birthdate"
				validators={{
					onChange: ({ value }) => {
						if (!value) {
							return 'Birth date is required'
						}
						const minBirthdate = new Date()
						minBirthdate.setFullYear(
							minBirthdate.getFullYear() - 18,
						)
						if (value > minBirthdate) {
							return 'The date you entered suggests you are under 18'
						}
					},
				}}
			>
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
							onChange={(e) => field.handleChange(e.target.value)}
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
