
import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "./firebase.js";

// Initialize Firebase Authentication
const auth = getAuth();
const provider = new GoogleAuthProvider();

// Function to handle sign-up
const handleSignUp = () => {
    const email = document.getElementById("email").value;
    const signpassword = document.getElementById("signpassword").value;

    // Firebase sign-up
    createUserWithEmailAndPassword(auth, email, signpassword)
        .then((userCredential) => {
            // Signed up successfully
            Swal.fire({
                title: "Success!",
                text: "Account created successfully!",
                icon: "success",
                confirmButtonText: "OK",
            }).then(() => {
                // Redirect to signin.html
                window.location.href = "signin.html";
            });
        })
        .catch((error) => {
            const errorCode = error.code;

            if (errorCode === "auth/email-already-in-use") {
                Swal.fire({
                    title: "Error!",
                    text: "Email already exists. Please use another email.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } else if (errorCode === "auth/invalid-email") {
                Swal.fire({
                    title: "Error!",
                    text: "Invalid email format. Please try again.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            } else {
                Swal.fire({
                    title: "Error!",
                    text: "Something went wrong. Please try again later.",
                    icon: "error",
                    confirmButtonText: "OK",
                });
            }
        });
};

// Function to handle Google Sign-In
const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("Google Sign-In successful:", result.user);

            Swal.fire({
                icon: "success",
                title: "Sign-In Successful",
                text: `Welcome, ${result.user.displayName}! Redirecting to your profile...`,
                timer: 2000,
                showConfirmButton: false,
            }).then(() => {
                window.location.href = "profile.html";
            });
        })
        .catch((error) => {
            console.error("Error during Google sign-in:", error);

            let message = "An unknown error occurred.";
            switch (error.code) {
                case "auth/popup-blocked":
                    message = "Popup was blocked. Please allow popups.";
                    break;
                case "auth/popup-closed-by-user":
                    message = "You closed the popup. Try again.";
                    break;
                case "auth/invalid-api-key":
                    message = "Invalid API key.";
                    break;
                case "auth/network-request-failed":
                    message = "Network error.";
                    break;
                case "auth/account-exists-with-different-credential":
                    message = "An account exists with this email.";
                    break;
                case "auth/operation-not-allowed":
                    message = "Google Sign-In is not enabled.";
                    break;
            }

            Swal.fire({
                icon: "error",
                title: "Sign-In Failed",
                text: message,
            });
        });
};

// Add event listeners
document.getElementById("SignupBtn").addEventListener("click", handleSignUp);
document.getElementById("googleBtn").addEventListener("click", handleGoogleSignIn);