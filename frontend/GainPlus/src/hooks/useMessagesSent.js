import { useEffect, useState } from "react";
import useMessages from "../store/useMessages";
import { auth } from "../firebase/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase"; // Assuming db is initialized in your firebase.js

const useMessagesSent = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages } = useMessages();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, "messages"),
          where("senderID", "==", auth.currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const messagesData = querySnapshot.docs.map((doc) => doc.data());

        setMessages(messagesData);
      } catch (error) {
        toast.error("Failed to load messages");
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth.currentUser) getMessages();
  }, [setMessages]);

  return { messages, loading };
};

export default useMessagesSent;
