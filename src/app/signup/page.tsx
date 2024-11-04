"use client";

import { useState } from 'react';
import { createClient } from '../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { User } from '@/types/user';
import SignUpCard from '@/components/SignUpCard';
const supabase = createClient();

const Signup = () => {
  const [user, setUser] = useState<User>({ email: '', full_name: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Sign up the user using Supabase
    const { error } = await supabase.auth.signUp({
      email: user.email,
      password: user.password,
      options: {
        data: {
          full_name: user.full_name,
        },
      },
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    } else {
      // Redirect to dashboard or login after successful signup
      router.push('/dashboard'); // Adjust this route as needed
    }
  };

  return (
    <>
      <SignUpCard handleSignup={handleSignup} setUser={setUser} user={user} error={error || ''} loading={loading} />
    </>
  );
};

export default Signup;
