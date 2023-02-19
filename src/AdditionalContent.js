import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
// import classes from "./AdditionalContent.module.css";
const AdditionalContent = () => {
  return (
    <div>
      <YouTubeIcon
        href="https://www.youtube.com/@tuxedosband1988"
        style={{ color: "gold" }}
        fontSize="large"
      />

      <FacebookIcon style={{ color: "gold" }} fontSize="large" />
    </div>
  );
};
export default AdditionalContent;
