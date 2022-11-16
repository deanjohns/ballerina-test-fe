import { AuthProvider } from "@asgardeo/auth-react";

const AppProvider = ({ children }) => {

    return (
        <AuthProvider
            config={{
                signInRedirectURL: "https://localhost:3000/",
                signOutRedirectURL: "https://localhost:3000/",
                clientID: "xvqvWvIM7wZWfCbcAT3W8yLd05Ia",
                baseUrl: "https://api.asgardeo.io/t/tvhubv2",
                scope: ["openid", "profile"]
            }}
        >
            {children}
        </AuthProvider>
    )
}

export default AppProvider;