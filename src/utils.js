
import emailjs from 'emailjs-com';

const sendMail = async (fullName, email, myID) => {

    var templateParams = {
        name: fullName,
        email: email,
        id: myID,
    };

    emailjs.send("service_r8b6egd", 'template_xoik3tl', templateParams, "user_QYAvAUSTHy6sMtzG0lIo4")
        .catch(e => console.log(e))
}

const sendMatchFoundEmail = async (user1Email, user1FullName, user2Email, user2FullName) => {

    var templateParams = {
        user1Email: user1Email,
        user1FullName: user1FullName,
        user2Email: user2Email,
        user2FullName: user2FullName
    };

    emailjs.send("service_r8b6egd", 'template_p1wfh1b', templateParams, "user_QYAvAUSTHy6sMtzG0lIo4")
        .catch(e => console.log(e))
}

export { sendMail, sendMatchFoundEmail }
