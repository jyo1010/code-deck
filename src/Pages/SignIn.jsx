import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import FormInputComponent from '../Component/FormInputComponent'
import { toastArray } from "../Component/Toast";
import { toast } from "react-toastify";
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
import { signInWithPopup, GoogleAuthProvider,  } from 'firebase/auth'
import { FcGoogle } from 'react-icons/fc'
function SignIn() {

  const navigate = useNavigate()

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required field'),
    password: yup.string().required('Required field').min(6, 'Password must be at least 6 characters')
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })
  const googleProvider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      toast.success("SignIn Succesfull", toastArray);
    }).catch((error) => {
      toast.error("error", toastArray);
    })
  }
  const onSubmit = (data) => {
    console.log(data)
    auth.signInWithEmailAndPassword(data.email, data.password)
      .then((userCredential) => {
        toast.success("SignIn Succesfull", toastArray);
      }).catch((error) => {
        console.log("error in signing in")
        toast.error("error", toastArray);

      });
  }

  // const githubProvider = new GithubAuthProvider();
  // const signInWithGithub = () => {
  //   signInWithPopup(auth, githubProvider).then(async (response) => {
  //       console.log("response", response);
  //   }).catch((err) => {
  //     console.log("err", err);
  //   });
  // }

  return (
    <div className=' bg-primary flex flex-col h-6/12 w-6/12 p-4 rounded-2xl mt-8 mx-auto justify-center'>

      <h1 className='text-center font-semibold'>Sign In to CodeDeck </h1>
      <img className='mx-auto p-4 justify-center w-16' src="/logo.png" alt=""/>
      {/* <h1 className='text-center font-semibold'>Codedeck</h1> */}
      <form id="hook-form" className='mt-16' onSubmit={handleSubmit(onSubmit)}>
        <FormInputComponent
          label='Email'
          type='email'
          name='email'
          placeholder='Enter your email'
          control={control}
          error={errors?.email?.message}
          required
        />
        <FormInputComponent
          label='Password'
          type='password'
          name='password'
          placeholder='Enter your password'
          control={control}
          error={errors?.password?.message}
          required
        />

      </form>
      <button type='submit' form='hook-form' className='w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg'> Sign In </button>
      <button onClick={signInWithGoogle} form='hook-form' className='w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg text-center flex justify-center'> <span className="flex items-center gap-3"><FcGoogle style={{ fontSize: "2rem" }} /> Sign In with Google</span> </button>
      {/* <button onClick={signInWithGithub} form='hook-form' className='w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg text-center flex justify-center'> <span className="flex items-center gap-3"><FcGoogle style={{ fontSize: "2rem" }} /> Sign In with Google</span> </button> */}

      <h5 className='mt-4'>Don't have an account ?<span className='text-mint Light mx-2 underline cursor-pointer' onClick={() => { navigate("/signup") }}>Sign Up</span></h5>

    </div>
  )
}

export default SignIn