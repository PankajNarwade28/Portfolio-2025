import { mailtoLink ,githubLink,githubUsername,linkedinLink,leetcodelink} from "./links";

const contactInfo = [
    {
      iconUrl: "./assets/images/email.png",
      text: mailtoLink.replace("mailto:", ""),
      link: mailtoLink,
      platform: "email"
    },
    {
      iconUrl: "./assets/images/github.png",
      text: githubUsername,
      link: githubLink,
      platform: "github"
    },
    {
      iconUrl: "./assets/images/linkedin.png",
      text: linkedinLink.replace("https://www.linkedin.com/in/", ""),
      link: linkedinLink,
      platform: "linkedin"
    },
    {
      iconUrl: "./assets/images/leetcode.png",  
      text: leetcodelink.replace("https://leetcode.com/", ""),
      link: leetcodelink,
      platform: "leetcode"
    }
  ];

    export default contactInfo;