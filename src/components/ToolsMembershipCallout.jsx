import { Link } from 'react-router-dom'
import '../pages/spellingBee.css'

export default function ToolsMembershipCallout() {
  return <aside className="bee-membership-callout"><div><h2>A monthly option for teacher tools</h2><p>Explore the planned Roots Teacher Membership. Current tools remain free while pricing, member access and billing are prepared.</p></div><Link className="btn-secondary" to="/membership">See the membership plan →</Link></aside>
}
