export default function ComparisonTable({ rows }) {
  return (
    <div role="region" aria-label="Chowder comparison">
      <div className="comparison-table-wrap">
        <table className="comparison-table">
          <thead>
            <tr>
              <th scope="col">Feature</th>
              <th scope="col">Typical Agency</th>
              <th scope="col">Chowder Media</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.criterion}>
                <th scope="row">{row.criterion}</th>
                <td>
                  <span className="comparison-icon comparison-icon-x" aria-hidden="true">
                    ✗
                  </span>
                  <span>{row.typical}</span>
                </td>
                <td className="comparison-chowder">
                  <span className="comparison-icon comparison-icon-check" aria-hidden="true">
                    ✓
                  </span>
                  <span>{row.chowder}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="comparison-mobile-list">
        {rows.map((row) => (
          <article key={`${row.criterion}-mobile`} className="comparison-mobile-card">
            <h3>{row.criterion}</h3>
            <div className="comparison-mobile-row">
              <p className="comparison-mobile-label">Typical Agency</p>
              <p>
                <span className="comparison-icon comparison-icon-x" aria-hidden="true">
                  ✗
                </span>
                <span>{row.typical}</span>
              </p>
            </div>
            <div className="comparison-mobile-row comparison-mobile-chowder">
              <p className="comparison-mobile-label">Chowder Media</p>
              <p>
                <span className="comparison-icon comparison-icon-check" aria-hidden="true">
                  ✓
                </span>
                <span>{row.chowder}</span>
              </p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
