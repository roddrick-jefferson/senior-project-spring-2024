const sendEmail = async (email: email) => {
  const res = await fetch("/mail/sendEmail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(email),
  });
  console.log("status: ", res.status);
}

export default sendEmail;
