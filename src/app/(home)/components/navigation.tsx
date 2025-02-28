// COMPONENTS
import NavLink from '@/components/nav-link/nav-link';

export default function Navigation() {
  return (
    <div className="flex gap-5">
      <div>
        <NavLink href="#">Project structure</NavLink>
      </div>

      <div>
        <NavLink href="#">Custom components</NavLink>
      </div>

      <div>
        <NavLink href="#">Features and mechanisms</NavLink>
      </div>
    </div>
  );
}
