import { signout } from "@/app/auth/actions";
import { Button } from "@/components/ui";

export function LogoutButton() {
  return (
    <form action={signout}>
      <Button type="submit" variant="secondary" size="sm">
        Log out
      </Button>
    </form>
  );
}
