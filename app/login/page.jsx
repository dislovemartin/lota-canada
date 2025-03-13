import { LoginForm } from "@/components/login-form";
export const metadata = {
    title: "Login - LOTA",
    description: "Login to your LOTA account to access exclusive resources and events.",
};
export default function LoginPage() {
    return (<div className="container max-w-screen-xl mx-auto py-12 md:py-24">
      <div className="mx-auto max-w-md">
        <LoginForm />
      </div>
    </div>);
}
