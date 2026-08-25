import { requirePermission } from "@/lib/dal";
import { getAllRoles, createRole, deleteRole } from "@/lib/roles-db";
import { revalidatePath } from "next/cache";

async function handleCreate(formData: FormData) {
  "use server";
  const name = formData.get("name") as string;
  const label = formData.get("label") as string;
  if (name && label) await createRole(name, label);
  revalidatePath("/dashboard/settings/roles");
}

async function handleDelete(formData: FormData) {
  "use server";
  const roleId = formData.get("roleId") as string;
  try {
    await deleteRole(roleId);
  } catch (err) {
    console.error(err);
  }
  revalidatePath("/dashboard/settings/roles");
}

export default async function RolesPage() {
  await requirePermission("settings");
  const roles = await getAllRoles();

  return (
    <div className="max-w-2xl space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="mb-4 text-base font-bold text-slate-800">Create a new role</h2>
        <form action={handleCreate} className="flex gap-3">
          <input name="label" placeholder="Display name, e.g. Librarian" required
            className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary" />
          <input name="name" placeholder="Slug, e.g. librarian" required
            className="w-40 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none focus:border-primary" />
          <button type="submit" className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90">
            Create
          </button>
        </form>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 p-4 text-sm font-semibold text-slate-700">Existing roles</div>
        <div className="divide-y divide-slate-100">
          {roles.map((role) => (
            <div key={role.id} className="flex items-center justify-between p-4">
              <div>
                <div className="text-sm font-medium text-slate-800">{role.label}</div>
                <div className="text-xs text-slate-400">{role.name}{role.isSystem ? " · system role" : ""}</div>
              </div>
              {!role.isSystem && (
                <form action={handleDelete}>
                  <input type="hidden" name="roleId" value={role.id} />
                  <button type="submit" className="text-sm text-red-500 hover:text-red-600">Delete</button>
                </form>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}