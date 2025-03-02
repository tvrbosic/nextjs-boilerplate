// COMPONENTS
import NavLink from '@/components/nav-link/nav-link';

export default function Navigation() {
  return (
    <div className="flex gap-5">
      <div>
        <NavLink href="/project-structure" size="lg">
          Project structure
        </NavLink>
      </div>

      <div>
        <NavLink href="/custom-components" size="lg">
          Custom components
        </NavLink>
      </div>

      <div>
        <NavLink href="/features-and-mechanisms" size="lg">
          Features and mechanisms
        </NavLink>
      </div>
    </div>
  );
}
