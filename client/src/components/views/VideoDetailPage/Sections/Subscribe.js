import React, { useEffect, useState } from "react";
import axios from "axios";

function Subscribe(props) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    // 구독자 수 정보 가져오기
    const variable = { userTo: props.userTo };
    axios.post("/api/subscribe/subscribeNumber", variable).then((res) => {
      if (res.data.success) {
        setSubscribeNumber(res.data.subscribeNumber);
      } else {
        alert("구독자 수 정보를 받아오지 못했습니다.");
      }
    });

    // 구독 여부 정보 가져오기
    const subscribedVariable = {
      userTo: props.userTo,
      userFrom: localStorage.getItem("userId"),
    };
    axios.post("/api/subscribe/subscribed", subscribedVariable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
        setSubscribed(res.data.subscribed);
      } else {
        alert("정보를 받아오지 못했습니다.");
      }
    });
  }, []);

  // 구독 버튼 클릭 시
  const handleSubscribe = () => {
    const subscribedVariable = {
      userTo: props.userTo,
      userFrom: props.userFrom,
    };
    // 이미 구독 중이라면
    if (Subscribed) {
      axios
        .post("/api/subscribe/unSubscribe", subscribedVariable)
        .then((res) => {
          if (res.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert("구독 취소 실패");
          }
        });
    } // 아직 구독 중이 아니라면
    else {
      axios.post("/api/subscribe/subscribe", subscribedVariable).then((res) => {
        if (res.data.success) {
          setSubscribeNumber(SubscribeNumber + 1);
          setSubscribed(!Subscribed);
        } else {
          alert("구독 실패");
        }
      });
    }
  };

  return (
    <div>
      <button
        style={{
          backgroundColor: `${Subscribed ? "#AAAAAA" : "#CC0000"}`,
          borderRadius: "4px",
          border: "none",
          color: "white",
          padding: "10px 16px",
          fontWeight: "500",
          fontSize: "1rem",
          textTransform: "uppercase",
          cursor: "pointer",
        }}
        onClick={handleSubscribe}
      >
        {SubscribeNumber} {Subscribed ? "Subscribed" : "Subscribe"}
      </button>
    </div>
  );
}

export default Subscribe;
