import { SignupForm } from "@/components/SignupForm";

export const metadata = {
  title: "Sign Up | LocalHub",
  description: "Create your LocalHub account"
};

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">LocalHub</h1>
          <p className="text-gray-600 mt-2">
            Connect with local service providers
          </p>
        </div>
        <SignupForm />
      </div>
    </div>
  );
}
