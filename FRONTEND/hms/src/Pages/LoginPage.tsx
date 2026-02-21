import React from 'react'
import {Button, PasswordInput, TextInput} from "@mantine/core";
import {IconHeartbeat} from "@tabler/icons-react";

const LoginPage = () => {
    return (
        <div style={{ background: 'url("/bg.jpg")' }} className='h-screen w-screen !bg-cover !bg-center !bg-no-repeat flex flex-col items-center justify-center'>
            <div className='py-3 text-red-500 flex gap-1 items-center'>
                <IconHeartbeat size={45} stroke={2.5}/>
                <span className='font-heading font-semibold text-4xl'>Health</span>
            </div>
            <div className='w-[450px] backdrop-blur-md p-10 py-8 rounded-lg'>
                <form className='flex flex-col gap-5 [&_input]:placeholder-neutral-100'>
                    <div className='self-center font-medium font-heading text-white text-xl'>Login</div>
                    <TextInput variant="unstyled" size="md" radius="md" placeholder="Email"/>
                    <PasswordInput variant="unstyled" size="md" radius="md" placeholder="Password"/>
                    <Button type='submit' color="red">Login</Button>
                </form>
            </div>
        </div>
    )
}

export default LoginPage