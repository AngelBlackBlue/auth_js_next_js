import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmailVerification = async (email: string, token: string) => {
    try {
        await resend.emails.send
        ({
            from: 'no-reply@yourdomain.com',
            to: email,
            subject: 'Verify your email',
            html: `<p>Please verify your email by clicking on the following link:</p>
            <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verify Email</a>`
        })
    }
    catch (error) {
        console.log(error)
        return error
        
    }
    
}