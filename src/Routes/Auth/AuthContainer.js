import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import {
  LOG_IN,
  CREATE_ACCOUNT,
  CONFIRM_SECRET,
  LOCAL_LOG_IN
} from "./AuthQueries";
import { toast } from "react-toastify";

export default () => {
  const [action, setAction] = useState("logIn");
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const secret = useInput("");

  const email = useInput("");

  const [requestSecretMutation] = useMutation(LOG_IN, {
    // updata는 cache를 update하기 원할떄 아폴로 Client,js를 update하고싶을떄
    // update: (_, { data }) => {
    //   const { requestSecret } = data;
    //   if (!requestSecret) {
    //     toast.error("계정이 존재하지 않습니다. 회원가입 페이지로 이동합니다");
    //     setTimeout(() => setAction("signUp"), 3000);
    //   }
    // },
    variables: { email: email.value }
  });

  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      username: username.value,
      email: email.value,
      firstName: firstName.value,
      lastName: lastName.value
    }
  });

  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      email: email.value,
      secret: secret.value
    }
  });

  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);

  const onSubmit = async e => {
    e.preventDefault();
    if (action === "logIn") {
      if (email.value !== "") {
        try {
          const {
            data: { requestSecret }
          } = await requestSecretMutation();
          // const data = await requestSecretMutatin();
          // cont requestSecret = data;
          if (!requestSecret) {
            toast.error(
              "계정이 존재하지 않습니다. 회원가입 페이지로 이동합니다"
            );
            setTimeout(() => setAction("signUp"), 3000);
          } else {
            toast.success(
              "이메일에 접속하여 인증 비밀번호를 확인 후 입력하세요"
            );
            setAction("confirm");
          }
        } catch {
          toast.error("비밀번호 요청을 할 수 없습니다. 다시 시도해주세요");
        }
      } else {
        toast.error("이메일이 필요합니다");
      }
    } else if (action === "signUp") {
      if (
        username.value !== "" &&
        email.value !== "" &&
        firstName.value !== "" &&
        lastName.value !== ""
      ) {
        try {
          const {
            data: { createAccount }
          } = await createAccountMutation();
          if (!createAccount) {
            toast.error("계정을 생성 할 수 없습니다.");
          } else {
            toast.success(" 계정이 생성되었습니다! 로그인 페이지로 이동합니다");
            setTimeout(() => setAction("logIn"), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error("모든 항목을 작성하여 주세요");
      }
    } else if (action === "confirm") {
      if (secret.value !== "") {
        try {
          const {
            data: { confirmSecret: token }
          } = await confirmSecretMutation();
          // if(!confirmSecret) {
          //   toast.error("인증 비밀번호가 일치하지 않습니다")
          // } else {
          //   toast.success(" 인증 비밀번호가 일치합니다 ");

          // }
          //토근이 먼저 생기는게 아닌 confirm secret을 호출한 후에 생기는 거기 때문에 variable이 밑에 있다
          if (token !== "" && token !== undefined) {
            localLogInMutation({ variables: { token } });
          } else{
            throw Error();
          }
        } catch {
          toast.error(" 인증 비밀번호가 일치하지 않습니다, 다시 한번 시도해보세요");
        }
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      username={username}
      firstName={firstName}
      lastName={lastName}
      email={email}
      secret={secret}
      onSubmit={onSubmit}
    />
  );
};
