import styled from "styled-components";

export default styled.form`
  #wrapper {
    width: 60vw;
    height: 50vh;
    overflow: hidden;
    border: 0px solid #000;
    margin: 7.5rem auto;
    padding: 2rem;
    border: 1px solid black;
    border-radius: 50px;
  }

  .header {
    border: 0px solid #000;
    margin-bottom: 5px;
  }

  .header img {
    height: 15vh;
    width: 30vw;
    position: relative;
    left: 3.4rem;
    margin-bottom: -1rem;
  }
  .hasAccount {
    display: flex;
    justify-content: center;
    margin-top: 0.8rem;
    margin-bottom: 0.3rem;
  }

  .containerInput {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  input {
    padding: 0.3rem;
    margin-left: 1rem;
    margin-top: 0.2rem;
    border: 1px solid black;
    border-radius: 30px;
  }

  #birthday {
    padding-right: 3.87rem;
  }
  #next {
    margin-top: 1rem;
    margin-left: 4.5rem;
    width: 20vw;
    background-color: #fbbdc6;
    cursor: pointer;
  }
  @media only screen and (min-width: 961px) {
    #wrapper {
      height: 65vh;
    }
    .header img {
      height: 35vh;
      width: 20vw;
      margin-top: -5rem;
    }
    .hasAccount {
      font-size: 15pt;
    }
    .containerInput {
      margin-left: 27rem;
    }
    input {
      padding: 0.7rem;
    }
    #birthday {
      padding-right: 4.2rem;
    }
    #next {
      margin-left: 30.5rem;
      width: 7vw;
    }
  }
`;
