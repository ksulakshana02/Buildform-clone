const questions = [
    {
        id: 1,
        type: "text",
        text: "Before we start, what is your name?",
        subText: "First name",
        placeholder: "Jane",
        isRequired: false
    },
    {
        id: 2,
        type: "text",
        subText: "Last name",
        placeholder: "Smith",
        isRequired: false
    },
    {
        id: 3,
        type: "text",
        text: "What's your email address?",
        subText: "This is how we'll contact you.",
        placeholder: "name@example.com",
        isRequired: true,
        validation: "email"
    },
    {
        id: 4,
        type: "select",
        text: "Which country you are from? 🏡🏡🏡",
        placeholder: "Type or select an option",
        isRequired: false
    },
    {
        id: 5,
        type: "text",
        text: "What is your phone number?",
        placeholder: "0551 23 45 67",
        validation: "phone",
        isRequired: true
    },
    {
        id: 6,
        type: "radio-group",
        text: "What languages and frameworks are you familiar with?",
        subText: "Select all the languages you know.",
        options: [
            "Solidity", "Rust", "Node.js", "Typescript", "Javascript", "C", "C++", "C#", "SQL", "Python", "Assembly Language", "Haskell", "R", ".NET", "Other"
        ],
        isRequired: false
    },
    {
        id: 7,
        type: "radio",
        text: "How would you describe your current level of coding experience?",
        options: [
            "No experience (I have never programmed before.)", "Beginner (I have played with some introductory coding lessons and tutorials.)", "Intermediate (I have completed some coding classes or tutorials.)", "Advanced (I can build applications.)", "Professional (I am an experienced software engineer.)"
        ],
        isRequired: false
    },
    {
        id: 8,
        type: "radio",
        text: "What is your current annual compensation? (Optional)",
        subText: "Disclaimer: The information provided regarding salary will be kept confidential and will not be used as a determining factor for acceptance into the bootcamp. It will be used exclusively for career advancement guidance.",
        options: [
            "<$30,000", "$30,000 - $50,000", "$50,000 - $80,000", "$80,000 - $120,000", "$120,000 - $250,000", "$250,000 or more"
        ],
        isRequired: false
    },
    {
        id: 9,
        type: "radio",
        text: "Certifying StatementThis question is required.*",
        subText: "I hereby acknowledge that this application form was completed by me (the individual seeking to enroll in Metana) and I did not receive help from any external sources. The responses submitted are entirely my own and based on my own reasoning. Also, I opt in to receive communication messages from Metana about my application.",
        options: [
            "I accept",
            "I don't accept"
        ],
        isRequired: true
    },
    {
        id: 10,
        type: "text",
        text: "LinkedIn URL (optional)",
        subText: "Here's a sniper link to make your life easy - linkedin.com (It'll open in a new tab) 🚀",
        isRequired: false,
        isLastQuestion: true
    }
];

export default questions;