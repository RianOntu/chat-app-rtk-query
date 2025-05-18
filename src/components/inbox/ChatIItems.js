import ChatItem from "./ChatItem";

export default function ChatItems() {
    return (
        <ul>
            <li>
                <ChatItem
                    avatar="https://cdn.pixabay.com/photo/2018/09/12/12/14/man-3672010__340.jpg"
                    name="Saad Hasan"
                    lastMessage="bye"
                    lastTime="25 minutes"
                />
             
            </li>
        </ul>
    );
}
