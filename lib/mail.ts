import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendEmailVerification = async (email: string, token: string) => {
    try {
        await resend.emails.send
        ({
            from: 'NextAuth <onbording@resend.dev>',
            to: email,
            subject: 'Verify your email',
            html: `<p>Please verify your email by clicking on the following link:</p>
            <a href="${process.env.AUTH_URL}/api/auth/verify-email?token=${token}">Verify-Email</a>`
        })

        return {
            success: true,
            message: 'Email sent successfully'
        }
    }
    catch (error) {
        console.log(error)
        return {
            error: true,
            message: 'Error sending email'
        }
        
    }
    
}