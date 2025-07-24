export const TutorialCard = ({ title, children }) => (
  <div className="tutorial-card">
    <h3 className="tutorial-title">{title}</h3>
    {children}
  </div>
);