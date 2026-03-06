export default function Section({ id, className = '', children }) {
  return (
    <section id={id} className={`section ${className}`.trim()}>
      <div className="section-inner">{children}</div>
    </section>
  );
}
