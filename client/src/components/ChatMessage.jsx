/* Props
 Message: {
  id: message ID,
  user_id: use to check logged in 
  message_text: "string",
  created_at: "timestamp string"
}

loggedIn: determines styling

users: get users data 
*/
export default function ChatMessage({message, userID, users}){

  let loggedIn = false;

  if (message.user_id === userID) {
    loggedIn = true;
  }

  return loggedIn ? (
    <div className="messageContainer justifyEnd">
      <p className="sentText pr-10">{message.user_id}</p>
      <div className="messageBox backgroundBlue">
        <p className="messagetext colorWhite">{message.message_text}</p>
        <p className="messageTime">{(message.created_at)}</p>
      </div>
    </div>
  ) : (
    <div className="messageContainer justifyStart">
      <div className="messageBox backgroundLight">
        <p className="messagetext colorDark">{message.message_text}</p>
      </div>
      <p className="sentText pl-10">{message.user_id}</p>
      <p className="messageTime">{(message.created_at)}</p>
    </div>
  )
} 