import React, { useEffect, useRef, useState } from "react";

const LiveSet = () => {
  const [username, setUsername] = useState("");
  const [recipient, setRecipient] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState("Connecting...");
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("wss://ws.postman-echo.com/raw");

    ws.current.addEventListener("open", () => {
      setStatus("Connected");
    });

    ws.current.addEventListener("close", () => {
      setStatus("Disconnected");
    });

    ws.current.addEventListener("error", () => {
      setStatus("Connection error");
    });

    ws.current.addEventListener("message", (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.to === username && data.from === recipient) {
          addMessage(data.from, data.message, false);
        }
      } catch {}
    });

    return () => {
      ws.current.close();
    };
  }, [username, recipient]);

  const addMessage = (sender, text, isOwn) => {
    setMessages((prev) => [...prev, { sender, text, isOwn }]);
  };

  const simulateIncomingMessage = () => {
    const responses = [
      "That's interesting!",
      "I see what you mean.",
      "Can you tell me more?",
      "Thanks for sharing!",
      "I'll think about it.",
      "Sounds good to me.",
      "Let's catch up later.",
      "I'm here if you need me.",
      "Got it!",
      "Absolutely!",
      "No worries.",
      "I'm listening.",
      "What do you think?",
      "Exactly!",
      "Makes sense.",
      "That’s cool.",
      "I understand.",
      "You're right.",
      "Totally agree.",
      "Well said.",
      "Hmm... interesting.",
      "That sounds fun!",
      "Let’s dive deeper.",
      "Really? Tell me more.",
      "Interesting take!",
      "I respect that.",
      "I hear you.",
      "Nice!",
      "Cool insight!",
      "True that.",
      "Indeed!",
      "Right on.",
      "Whoa, okay!",
      "For sure.",
      "Gotcha!",
      "You're on point.",
      "Keep going!",
      "That's insightful.",
      "Hmm, I see.",
      "Tell me your thoughts.",
      "Thanks for telling me!",
      "That helps.",
      "I’m intrigued.",
      "I can relate.",
      "You nailed it.",
      "Aha!",
      "Couldn’t agree more.",
      "Totally get that.",
      "I’m with you.",
      "Let’s chat more.",
      "That’s smart.",
      "Solid point!",
      "Nice angle.",
      "You’ve got a point.",
      "Totally makes sense.",
      "Say more!",
      "Okay, cool.",
      "Right, good thought.",
      "Following you.",
      "Noted!",
      "Hmm... got it.",
      "That’s pretty cool!",
      "Now I get it.",
      "Alright!",
      "Interesting thought!",
      "You make a good case.",
      "Fascinating!",
      "Oh wow, okay.",
      "That’s new to me.",
      "I like how you think.",
      "Wow, didn’t think of that.",
      "Smart thinking.",
      "That’s clever!",
      "Hey, that’s deep.",
      "Right, I agree.",
      "Love it!",
      "That’s brilliant.",
      "Respect!",
      "That’s wise.",
      "It’s a good thought.",
      "Makes total sense.",
      "Agreed!",
      "Yeah, I see that.",
      "Okay, explain more.",
      "That could work.",
      "You’re onto something!",
      "Thanks for that!",
      "Interesting vibe!",
      "I’m thinking about it.",
      "That works.",
      "Sure thing!",
      "Let me reflect on that.",
      "Absolutely agree.",
      "I appreciate this.",
      "Oh, I like that.",
      "Let’s explore that.",
      "That’s a great idea!",
      "Interesting direction.",
      "Okay, yes.",
      "Valid point.",
      "I feel that.",
      "Whoa, okay wow!",
      "That caught my attention.",
      "Now that’s cool!",
      "Not bad at all.",
      "That rings true.",
      "Okay, continue...",
      "That’s quite a take.",
      "Sure, go on!",
      "Keep it coming!",
      "I vibe with that.",
      "That’s thoughtful.",
      "Yeah, tell me more.",
      "Nice observation.",
      "Cool take!",
      "I see your side.",
      "That’s neat!",
      "I’m down for that.",
      "It’s a valid view.",
      "Absolutely, yes.",
      "Tell me everything!",
      "So true!",
      "Awesome!",
      "That’s really something.",
      "Whoa, smart!",
      "Okay then!",
      "I dig it.",
      "You're thoughtful.",
      "Nice catch!",
      "That’s genius!",
      "Mind blown!",
      "Say what?!",
      "Good point!",
      "Wowzers!",
      "Nice idea.",
      "Boom!",
      "You’re insightful!",
      "Much appreciated.",
      "Let’s keep going.",
      "So good!",
      "Keep sharing!",
      "Golden!",
      "100% agree.",
      "Preach!",
      "Yes, that!",
      "Right right!",
      "Yup, I hear that.",
      "True words.",
      "Tell me more please!",
      "We’re aligned.",
      "Bingo!",
      "Couldn’t say it better.",
      "Great perspective!",
      "Very nice!",
      "This is great.",
      "That’s amazing!",
      "Uh-huh!",
      "No doubt.",
      "Tell me everything!",
      "That helps a lot.",
      "You’ve helped me see that.",
      "Mmm interesting.",
      "Got any more?",
      "Thanks again!",
      "Kinda cool actually.",
      "You make sense.",
      "Totally worth thinking about.",
      "I’ll consider that.",
      "Nice touch.",
      "Feeling inspired.",
      "Totally feel that.",
      "You’re amazing.",
      "Good thinking!",
      "Awesome insight!",
      "Way to go!",
      "I like that idea.",
      "You crushed it!",
      "You're making sense.",
      "Great insight!",
      "Tell me more like this!",
      "Hey, that’s a win.",
      "Respect your opinion.",
      "You’re clever.",
      "I appreciate your point.",
      "I’m impressed!",
      "Really useful.",
      "Bravo!",
      "You’re absolutely right.",
      "I like the logic.",
      "This is very useful.",
      "Totally with you!",
      "Good to know.",
      "Very true!",
      "Love your angle!",
      "Great point of view.",
      "On point!",
      "That’s lit!",
      "Fire comment!",
      "Epic!",
      "Straight facts.",
      "Truth!",
      "Let’s unpack that.",
      "Digging that!",
      "That’s solid.",
      "Very deep!",
      "Say that again!",
      "I’m loving this.",
      "Really? That’s cool.",
      "Yesss!",
      "That’s refreshing.",
      "Thanks for this!",
      "You got me thinking.",
      "Much love!",
      "Great energy!",
      "Feeling it!",
      "A wise mind!",
      "Legendary!",
      "Big respect.",
      "Impressive!",
      "Interesting journey.",
      "Makes me wonder.",
      "Full respect.",
      "Big facts!",
      "Thank you kindly.",
      "Heard and understood.",
      "Yes yes!",
      "Much clarity.",
      "Super helpful!",
      "A+ comment!",
      "Yessir!",
      "Grateful for this.",
      "Facts only.",
      "That’s sweet.",
      "You really get it.",
      "Hearing you loud and clear.",
      "That’s helpful info.",
      "Bless up!",
      "Chill response.",
      "Deep stuff!",
      "Loud and clear.",
      "Amazing share!",
      "Super valid!",
      "You’re spot on.",
      "More of this please!",
      "We’re synced.",
      "I agree entirely.",
      "Totally cool idea.",
      "Interesting view!",
      "I’m taking notes.",
      "Ooh, I see it now.",
      "That’s something new.",
      "Kudos!",
      "Legend move!",
      "Totally feeling this.",
      "Keep this coming.",
      "We should talk more!",
      "Facts man!",
      "Clap clap!",
      "Nice breakdown.",
      "Smooth answer.",
      "Well explained.",
      "You’re on fire!",
      "Respect that mindset.",
      "Yes! Finally someone said it.",
      "Cheers to that!",
      "Smart as always.",
      "Thanks for clarifying!",
      "Top-tier insight.",
      "Deep perspective!",
      "Rightly said!",
      "Minds in sync.",
      "Glad you shared!",
      "Feeling your words.",
      "Absolutely brilliant!",
      "That's interesting!",
      "I see what you mean.",
      "Can you tell me more?",
      "Thanks for sharing!",
      "I'll think about it.",
      "Sounds good to me.",
      "Let's catch up later.",
      "I'm here if you need me.",
      "Got it!",
      "Absolutely!",
      "Sure, that’s interesting!",
      "Totally get that!",
      "That makes sense.",
      "Love that idea!",
      "Interesting perspective!",
      "I’ll get back to you on that.",
      "Alright!",
      "Okay, noted.",
      "I hear you.",
      "Let me know more.",
      "Cool, thanks!",
      "That's cool.",
      "Alright, I'm listening.",
      "Makes perfect sense!",
      "Haha, nice one!",
      "I appreciate that.",
      "Understood.",
      "Good to know!",
      "You’re right.",
      "That’s cool with me.",
      "Alrighty!",
      "Great point!",
      "Sure thing!",
      "Of course!",
      "Very true.",
      "That’s valid.",
      "Nice insight!",
      "Sweet!",
      "I feel the same.",
      "Thanks a lot!",
      "Right back at you!",
      "Let’s talk soon.",
      "Appreciate it!",
      "I respect that.",
      "Alright then!",
      "Great job!",
      "Keep it coming!",
      "Happy to help!",
      "That’s nice to hear.",
      "Yeah, definitely.",
      "Sounds like a plan.",
      "Let’s go!",
      "Awesome!",
      "Wow, really?",
      "That's funny!",
      "No worries.",
      "No doubt.",
      "I see.",
      "Interesting thought!",
      "Agreed.",
      "That’s deep.",
      "I can relate.",
      "So true!",
      "Exactly!",
      "Thanks for that.",
      "You got it.",
      "I’m with you.",
      "Cheers!",
      "Let’s do this!",
      "Catch you later!",
      "Sure, anytime.",
      "Feel free to ask.",
      "Let’s talk more.",
      "Alright, sounds good.",
      "Talk to you soon.",
      "Take care!",
      "Hope so!",
      "I’m in!",
      "Let’s roll.",
      "What a thought!",
      "Couldn’t agree more!",
      "Good one!",
      "Very interesting!",
      "Right?",
      "Same here!",
      "I thought so too.",
      "Yep!",
      "100%!",
      "You bet!",
      "Nice to hear!",
      "Thanks for the update!",
      "Well said!",
      "So thoughtful!",
      "Much appreciated!",
      "Very nice!",
      "That’s great!",
      "I agree with that.",
      "You’re onto something.",
      "Thanks again!",
      "I’ve noted that.",
      "I like where this is going.",
      "Could be!",
      "Interesting take!",
      "I’m impressed!",
      "Looking forward to it!",
      "See you later!",
      "Good thinking!",
      "Count me in!",
      "Let me process that.",
      "Okay then!",
      "I like that!",
      "Kind of cool!",
      "Let’s chat more!",
      "Totally!",
      "Makes me think.",
      "Okay, I’ll bite.",
      "Nice view!",
      "Brilliant!",
      "Fair enough!",
      "Love that energy!",
      "Hey, that’s smart!",
      "That’s a vibe!",
      "Well played!",
      "Respect!",
      "Go on...",
      "I’d love that!",
      "Good one!",
      "We’re on the same page.",
      "Very thoughtful.",
      "Solid idea.",
      "Let’s see!",
      "You nailed it!",
      "Right on!",
      "Perfect!",
      "Nice angle!",
      "Cool perspective!",
      "Heard and noted.",
      "Oh, for sure!",
      "Can’t argue that!",
      "Good stuff!",
      "Well done!",
      "Love this!",
      "Okay, sounds fair.",
      "Awesome point.",
      "Let’s dive in!",
      "That’s clever.",
      "Can’t wait!",
      "You’re amazing!",
      "Okay, I’ll try.",
      "That works for me.",
      "Very fair.",
      "Amazingly put!",
      "High five!",
      "Thanks, buddy!",
      "Good catch!",
      "Yup, makes sense.",
      "That’s powerful!",
      "I vibe with that.",
      "You're really good at this!",
      "Totally valid.",
      "That’s gold!",
      "Aha, I get it.",
      "That helps!",
      "I appreciate your honesty.",
      "I’m proud of you!",
      "Haha, I love it!",
      "Now we’re talking!",
      "That’s the spirit!",
      "You got this!",
      "So true, bestie!",
      "Exactly my thought.",
      "On point!",
      "Facts!",
      "Pure genius!",
      "Let’s team up!",
      "Respectfully agreed.",
      "Real talk!",
      "Boom!",
      "Say less!",
      "Let’s make it happen!",
      "Solid take!",
      "A+ response.",
      "Oh yes!",
      "Preach!",
      "Couldn’t agree more.",
      "Valid point.",
      "Straight up!",
      "Alright, I’m convinced.",
      "So wholesome!",
      "Great vibe!",
      "Looking great!",
      "It checks out!",
      "Big yes!",
      "I'm excited!",
      "Can’t complain.",
      "Kinda neat!",
      "Hey that’s cool!",
      "Boom, done.",
      "Let’s win!",
      "I’m into it!",
      "Very cool!",
      "Okay, sounds perfect.",
      "Go for it!",
      "Just awesome!",
    ];
    const randomResponse =
      responses[Math.floor(Math.random() * responses.length)];
    setTimeout(() => {
      addMessage(recipient, randomResponse, false);
    }, 1500 + Math.random() * 2000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!ws.current || ws.current.readyState !== WebSocket.OPEN) return;

    if (!username.trim() || !recipient.trim()) {
      alert("Please enter both your username and recipient username.");
      return;
    }

    const payload = JSON.stringify({
      from: username,
      to: recipient,
      message,
      timestamp: Date.now(),
    });

    ws.current.send(payload);
    addMessage(username, message, true);
    setMessage("");
    simulateIncomingMessage();
  };

  return (
    <div className=" min-h-screen flex flex-col font-sans py-10">
      <main className="flex-grow max-w-3xl mx-auto w-full border rounded-t-3xl p-4 shadow-2xl">
        <div className="mb-4">
          <label className="block mb-1 font-medium text-lime-300">
            Your Username
          </label>
          <input
            type="text"
            className="w-full rounded border  p-2"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium text-lime-300">
            Recipient Username
          </label>
          <input
            type="text"
            className="w-full rounded border  p-2"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
          />
        </div>

        <div className=" rounded shadow p-4 flex flex-col h-[400px]">
          <div className="flex-grow overflow-y-auto space-y-3 mb-4 px-2">
            {messages.length === 0 ? (
              <p className="text-center text-gray-400 mt-10">No messages yet</p>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${
                    msg.isOwn ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg break-words ${
                      msg.isOwn
                        ? "bg-blue-600 text-white"
                        : "bg-gray-300 text-gray-900"
                    }`}
                  >
                    <div className="text-xs font-semibold mb-1">
                      {msg.isOwn ? "You" : msg.sender}
                    </div>
                    <div>{msg.text}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={handleSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              className="flex-grow rounded border border-gray-300 p-2"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!username || !recipient || status !== "Connected"}
              required
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 rounded"
              disabled={!username || !recipient || status !== "Connected"}
            >
              <i className="fas fa-paper-plane"></i>
            </button>
          </form>
        </div>
      </main>

     
    </div>
  );
};

export default LiveSet;
