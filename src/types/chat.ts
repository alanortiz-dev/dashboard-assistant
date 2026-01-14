export type Role = "user" | "assistant";

export type TextMessage = {
    id: string;
    role: Role;
    type: "text";
    text: string;
};

export type RewardMessage = {
    id: string;
    role: "assistant";
    type: "reward";
    payload: {
        title: string;
        points: number;
        imageUrl: string;
    };
};

export type ChatMessage = TextMessage | RewardMessage;
