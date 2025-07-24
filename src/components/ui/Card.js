export const FeatureCard = ({ icon, title, description }) => (
  <Col lg={4} className="mb-4">
    <div className="feature-card">
      <div className="feature-icon material-icons">{icon}</div>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  </Col>
);