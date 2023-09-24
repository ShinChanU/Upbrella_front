import SignUpNotRequiredForm from "@/components/templates/SignUp/SignUpNotRequired";
import SignUpRequiredForm from "@/components/templates/SignUp/SignUpRequired";
import { $axios } from "@/lib/axios";
import { formatPhoneNumber } from "@/utils/utils";
import { MouseEvent, ChangeEvent, useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export type TInputs = {
  name: string;
  phoneNumber: string;
  bank: string;
  accountNumber: string;
};

const SignUpPage = () => {
  const [inputs, setInputs] = useState<TInputs>({
    name: "",
    phoneNumber: "",
    bank: "",
    accountNumber: "",
  });
  const [isNameValid, setIsNameValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [isAllAllow, setIsAllAllow] = useState(false);
  const [isFirstAllow, setIsFirstAllow] = useState(false);
  const [isSecondAllow, setIsSecondAllow] = useState(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const bankInput = useRef<HTMLInputElement>(null);

  const { name, phoneNumber, bank, accountNumber } = inputs;

  const navigate = useNavigate();

  useEffect(() => {
    const handleNameValid = () => {
      if (!!name && !/^[가-힣a-zA-Z]{2,6}$/.test(name)) {
        setIsNameValid(false);
      } else {
        setIsNameValid(true);
      }
    };
    const handlePhoneNumberValid = () => {
      if (!!phoneNumber && phoneNumber.length < 13) {
        setIsPhoneNumberValid(false);
      } else {
        setIsPhoneNumberValid(true);
      }
    };
    const isPass =
      !!name && !!phoneNumber && isNameValid && isPhoneNumberValid && isFirstAllow && isSecondAllow;
    setIsDone(isPass);
    handleNameValid();
    handlePhoneNumberValid();
  }, [name, phoneNumber, isNameValid, isPhoneNumberValid, isFirstAllow, isSecondAllow]);

  const handleInputValue = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      const phoneValue = formatPhoneNumber(value);
      setInputs({ ...inputs, [name]: phoneValue });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };

  const handleIsAllAllows = () => {
    const status = !isAllAllow;
    setIsAllAllow(status);
    setIsFirstAllow(status);
    setIsSecondAllow(status);
  };

  const handleIsFirstAllow = () => {
    const status = !isFirstAllow;
    if (status) {
      setIsFirstAllow(status);
    } else {
      setIsFirstAllow(status);
      setIsAllAllow(status);
    }
  };
  const handleIsSecondAllow = () => {
    const status = !isSecondAllow;
    if (status) {
      setIsSecondAllow(status);
    } else {
      setIsSecondAllow(status);
      setIsAllAllow(status);
    }
  };

  const onClickButton = () => {
    if (isDone) {
      alert("됐다.");
      setIsNext(true);
    }
  };
  const handleBackClick = () => {
    setIsNext(false);
  };

  const onClickBankArrow = () => {
    setIsOpenModal(!isOpenModal);
  };

  const handleClickBank = (event: MouseEvent<HTMLDivElement>) => {
    const bankName = event.currentTarget.textContent; // 선택한 은행의 이름을 가져옴
    if (bankInput.current) {
      setInputs({ ...inputs, [bankInput.current.name]: bankName });
      setIsOpenModal(!isOpenModal);
    }
  };

  const handleClose = () => {
    setIsOpenModal(!isOpenModal);
  };

  const onSubmitButton = async () => {
    const res = await $axios.post("/users/join", { ...inputs }, { withCredentials: true });
    if (res) {
      navigate("/");
      alert("회원가입이 완료되었습니다.");
    } else {
      alert("다시 시도해주세요");
    }
  };

  return (
    <>
      {isNext ? (
        <SignUpNotRequiredForm
          bank={bank}
          accountNumber={accountNumber}
          handleBackClick={handleBackClick}
          onChangeValue={handleInputValue}
          onClickBankArrow={onClickBankArrow}
          isOpenModal={isOpenModal}
          handleClose={handleClose}
          handleClickBank={handleClickBank}
          onClickButton={onSubmitButton}
          bankRef={bankInput}
        />
      ) : (
        <SignUpRequiredForm
          name={name}
          onChangeValue={handleInputValue}
          phoneNumber={phoneNumber}
          isNameValid={isNameValid}
          isPhoneNumberValid={isPhoneNumberValid}
          isAllAllow={isAllAllow}
          onClickAllAllow={handleIsAllAllows}
          isFirstAllow={isFirstAllow}
          isSecondAllow={isSecondAllow}
          onClickFirstAllow={handleIsFirstAllow}
          onClickSecondAllow={handleIsSecondAllow}
          onClickDetailTOSPage={() => navigate("/info/tos")}
          onClickDetailPPPage={() => navigate("/info/pp")}
          isDone={isDone}
          onClickButton={onClickButton}
        />
      )}
    </>
  );
};
export default SignUpPage;
