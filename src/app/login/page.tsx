"use client"
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { createClient } from "../../../utils/supabase/client";
import LoginCard from "@/components/LoginCard";

const supabase = createClient();

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Set the state to true when the component is mounted on the client side
    setIsClient(true);
  }, []);

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setError('');

    // Supabase login logic
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
        if (isClient) {
          router.push('/dashboard');
        }
    }
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
      },
    });
  };

  return (
    <LoginCard 
      handleLogin={handleLogin} 
      handleGoogleLogin={handleGoogleLogin}
      setEmail={setEmail}
      setPassword={setPassword}
      error={error}/>
  );
}
