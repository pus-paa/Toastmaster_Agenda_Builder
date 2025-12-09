import Link from "next/link";
import { Form } from "../form";
import { SubmitButton } from "../submit-button";
import { createUser, getUser } from '@/app/db';
import { redirect } from "next/navigation";


function Register() {
    async function register(formData: FormData) {
        'use server';
        let name = formData.get('name') as string;
        let email = formData.get('email') as string;
        let password = formData.get('password') as string;
        let user = await getUser(email);
        if (user) {
            return 'User already exists';
        } else {
            await createUser(name, email, password);
            redirect('/login');
        }
    }
    return (
        <div className="flex h-screen w-screen items-center justify-center bg-blue-100" >
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold mb-2 text-center text-blue-600">Sign Up</h1>
                <p className="text-center text-gray-600 mb-6">Create a new account</p>

                <Form action={register}>
                    <SubmitButton>Sign Up</SubmitButton>
                    <div className="text-center mt-4">
                        <p className="text-gray-600">
                            Already have an account?{''}
                            <Link href="/login" className="text-blue-600 font-bold hover:underline">
                                Login here
                            </Link>
                        </p>
                    </div>
                </Form>
            </div>

        </div>

    );
}

export default Register;