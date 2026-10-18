import { Link } from 'react-router-dom'
import '../pages/spellingBee.css'

export default function ToolsMembershipCallout() {
  return <aside className="bee-membership-callout"><div><h2>Room for your teaching to grow</h2><p>Explore proposed memberships for individual teachers, small teaching businesses and schools. Current free tools remain available.</p></div><Link className="btn-secondary" to="/membership">Explore the three plans →</Link></aside>
}
