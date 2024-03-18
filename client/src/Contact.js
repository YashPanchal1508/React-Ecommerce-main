import styled from "styled-components";

const Contact = () => {
  const Wrapper = styled.section`
    padding: 9rem 0 5rem 0;
    text-align: center;

    .container {
      margin-top: 6rem;

      .contact-form {
        max-width: 50rem;
        margin: auto;

        .contact-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;

          input[type="submit"] {
            cursor: pointer;
            transition: all 0.2s;

            &:hover {
              background-color: ${({ theme }) => theme.colors.white};
              border: 1px solid ${({ theme }) => theme.colors.btn};
              color: ${({ theme }) => theme.colors.btn};
              transform: scale(0.9);
            }
          }
        }
      }
    }
  `;

  return <Wrapper>
    <h2 className="common-heading">Contact Page</h2>
    <iFrame src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3670.7883345076266!2d72.57337917504334!3d23.068220379141813!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e83869a0efef1%3A0xc73838b3a35017a8!2sD%20Mart!5e0!3m2!1sen!2sin!4v1689929003996!5m2!1sen!2sin" width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iFrame>

    <div className="container">
      <div className="contact-form">
        <p style={{
          marginBottom: "4rem", fontSize: "2.5rem", fontWeight: "600", textTransform: "capitalize",
          color: "black"
        }}>
          Please fill out the form below to contact</p>
        <form action="https://formspree.io/f/xbjvlknp" method="POST" className="contact-inputs">
          <input type="text" name="username" placeholder="username" required autoComplete="off" />
          <input type="email" name="email" placeholder="email" required autoComplete="off" />
          <textarea name="Message" id="" cols="30" rows="10" placeholder="Enter Your Message"></textarea>
          <input type="submit" value="send" />
        </form>
      </div>
    </div>


  </Wrapper>;
};

export default Contact;
