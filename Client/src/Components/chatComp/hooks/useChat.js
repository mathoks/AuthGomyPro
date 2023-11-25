import { useMutation } from "@apollo/client";
import { CHAT_MAIN, IS_TYPING } from "../../../Mutation/ApiMutate";
import { useRecoilValue} from "recoil";
import { chatMess } from "../../../utills/store";

export const useSendChat = (list) => {
 
  const Info = { ...list };
  const chatList = useRecoilValue(chatMess);
  const [addMess, { data }] = useMutation(CHAT_MAIN);
  const submit = async () => {
    try {
      await addMess({
        variables: {
          info: Info,
        },
        fetchPolicy: "network-only",
        onCompleted: () => {
          return data;
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { submit, chatList };
};

export const useTyping = (typings) => {
  const [typing, { data }] = useMutation(IS_TYPING, {
    variables: { info: { isTyping: typings } },
    onCompleted: () => {
      return data;
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return { typing };
};
