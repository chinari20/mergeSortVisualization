import React, { useEffect, useState } from "react";
import Service from "../utils/http";
import {
    Avatar,
    Stack,
    Text,
    Paper,
    Container,
} from "@mantine/core";

const service = new Service();

/* Generate random solid color */
const getRandomColor = () => {
    const colors = [
        "#4F46E5", // indigo
        "#2563EB", // blue
        "#059669", // green
        "#D97706", // amber
        "#DC2626", // red
        "#7C3AED", // violet
        "#0EA5E9", // sky
        "#9333EA", // purple
    ];
    return colors[Math.floor(Math.random() * colors.length)];
};

export default function Profile() {
    const [user, setUser] = useState({});
    const [avatarColor] = useState(getRandomColor());

    async function getMyData() {
        try {
            const data = await service.get("user/me");
            setUser(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getMyData();
    }, []);

    const firstLetter = user?.name
        ? user.name.charAt(0).toUpperCase()
        : "?";

    const todayDate = new Date().toLocaleDateString();

    return (
        <div
            style={{
                minHeight: "100vh",
                background: "linear-gradient(135deg, #fbc2eb, #a6c1ee)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <Container size="xs">
                <Paper
                    radius="xl"
                    p="xl"
                    shadow="xl"
                    style={{
                        background: "rgba(255, 255, 255, 0.12)",
                        textAlign: "center",
                    }}
                >
                    <Stack align="center" spacing="md">

                        {/* SOLID COLOR LETTER AVATAR */}
                        <Avatar
                            size={120}
                            radius="50%"
                            styles={{
                                root: {
                                    backgroundColor: avatarColor,
                                },
                                placeholder: {
                                    color: "#000000",      // ✅ BLACK LETTER
                                    fontSize: "52px",
                                    fontWeight: 900,
                                },
                            }}
                        >
                            {firstLetter}
                        </Avatar>



                        <Text size="xl" fw={700}>
                            {user.name || "User"}
                        </Text>

                        <Text c="dimmed">{user.email}</Text>

                        <Text size="sm">
                            <strong>User ID:</strong> {user._id || "--"}
                        </Text>

                        <Text size="sm">
                            <strong>Account Created:</strong> {todayDate}
                        </Text>

                    </Stack>
                </Paper>
            </Container>
        </div>
    );
}
