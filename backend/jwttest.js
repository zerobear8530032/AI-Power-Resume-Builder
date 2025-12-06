import PersonalInfoForm from "../frontend/src/components/builder/PersonalInfoForm";
import { resumeModel, } from "./model/resumeSchema";


const resume = {
  resume_data: {
    personalInfo: {
      fullName: "zero bear",
      title: "bc",
      email: "zerobear18530032@gmail.com",
      phone: "+91 72239 88268",
      city: "bhopal",
      country: "india",
      portfolio: "https://example.com",
      socials: [{ socialName: 'lindin', socialLink: 'https://example.com' }, { socialName: 'https://example.com', socialLink: 'https://example.com' }],
    },
    professionalSummary: "jsdfjsbdjfdsjf",
    educations: [{ institute: 'S.v.polytechnic College', course: 'CSE', grades: '1.2', year: '1951' }],
    skills: {
      "skills": [
        {
          "skillTag": "Programming Languages",
          "skillNames": ["Python", "JavaScript", "Java"]
        },
        {
          "skillTag": "Frameworks & Libraries",
          "skillNames": ["React", "Node.js", "Django"]
        },
        {
          "skillTag": "Soft Skills",
          "skillNames": ["Communication", "Team Leadership", "Problem Solving"]
        },
        {
          "skillTag": "Tools & Platforms",
          "skillNames": ["Git", "Docker", "AWS", "Figma"]
        }
      ]
    },
    projects: {
      projects: [
        {
          "projectTitle": "AI Remote Controller",
          "projectDescription": "A remote controller that uses AI to recognize gestures and control devices remotely.",
          "techStacks": ["React.js", "Node.js", "Python", "TensorFlow"],
          "codeURL": "https://github.com/example/ai-remote-controller",
          "deployedURL": "http://ai-remote-controller.example.com"
        },
        {
          "projectTitle": "Smart Home Automation",
          "projectDescription": "An AI-powered system to automate lights, temperature, and appliances in a smart home.",
          "techStacks": ["Python", "Raspberry Pi", "MQTT", "Flask"],
          "codeURL": "https://github.com/example/smart-home-automation",
          "deployedURL": "http://smarthome.example.com"
        },
        {
          "projectTitle": "Resume Builder App",
          "projectDescription": "A web application that dynamically generates resumes with AI-based optimization.",
          "techStacks": ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
          "codeURL": "https://github.com/example/resume-builder",
          "deployedURL": "http://resume-builder.example.com"
        }
      ]
    },
    
  }
}