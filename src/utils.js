
import emailjs from 'emailjs-com';

const sendMail = async (fullName, email, id) => {

    var templateParams = {
        name: fullName,
        email: email,
        id: id,
    };

    console.log(`sending to: `, templateParams)

    emailjs.send("service_r8b6egd", 'template_xoik3tl', templateParams, "user_QYAvAUSTHy6sMtzG0lIo4")
        .then(function (response) {
            console.log('SUCCESS!', response.status, response.text);
        }, function (error) {
            console.log('FAILED...', error);
        });

}

export { sendMail }
