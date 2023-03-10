import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import FormInputComponent from '../Component/FormInputComponent'
import { toastArray } from "../Component/Toast";
import { toast } from "react-toastify";
import { auth } from '../firebaseConfig'
import { useNavigate } from 'react-router-dom'
function SignUp() {

  const navigate = useNavigate()
  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid Email').required('Required field'),
    password: yup.string().required('Required field').min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup.string().required('Required field').min(6, 'Password must be at least 6 characters').oneOf([yup.ref('password')], "passwords don't match")
  });

  const { register, handleSubmit, control, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = (data) => {
    auth.createUserWithEmailAndPassword(data.email, data.password).then((userCredential) => {
      toast.success("SignUp Succesfull", toastArray);
    }
    ).catch((error) => {
      toast.error(error, toastArray);
    })
    console.log(data)
  }


  return (
    <div className=' bg-primary flex flex-col h-6/12 w-6/12 p-4 rounded-2xl mt-8 mx-auto justify-center'>

      <h1 className='text-center font-semibold'>Sign Up to CodeDeck </h1>
      <img className='mx-auto p-4 justify-center w-16' src="/logo.png" alt=""/>
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
        <FormInputComponent
          label='Password'
          type='password'
          name='confirmPassword'
          placeholder='Enter your password'
          control={control}
          error={errors?.confirmPassword?.message}
          required
        />

      </form>
      <button type='submit' form='hook-form' className='w-full border-2 bg-white p-3 mt-8 font-semibold shadow-lg rounded-lg'> Sign Up</button>
      <h5 className='mt-4'>If you have account<span className='text-mint Light mx-2 underline cursor-pointer' onClick={()=>{navigate("/signin")}}>Sign In</span></h5>
    </div>
  )
}

export default SignUp