import { requirePermission } from "@/lib/dal";
import { navStructure } from "@/lib/nav-config";
import { getAllRoles } from "@/lib/roles-db";
import { mockPermissions } from "@/lib/mock-db";
import { setRolePermission } from "@/lib/permissions";
import { revalidatePath } from "next/cache";

async function togglePermission(formData: FormData) {
  "use server";
  const roleId = formData.get("roleId") as string;
  const featureKey = formData.get("featureKey") as string;
  const allowed = formData.get("allowed") === "true";
  await setRolePermission(roleId, featureKey, !allowed);
  revalidatePath("/dashboard/settings/permissions");
}

export default async function PermissionsPage() {
  await requirePermission("settings");

  const roles = await getAllRoles();
  const flatFeatures = navStructure.flatMap((item) => [item, ...(item.children ?? [])]);

  return (
    <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-left text-slate-500">
            <th className="p-4">Feature</th>
            {roles.map((role) => (
              <th key={role.id} className="p-4 text-center">{role.label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {flatFeatures.map((feature) => (
            <tr key={feature.key} className="border-b border-slate-100">
              <td className="p-4 font-medium text-slate-700">{feature.label}</td>
              {roles.map((role) => {
                const allowed = mockPermissions[role.id]?.has(feature.key) ?? false;
                return (
                  <td key={role.id} className="p-4 text-center">
                    <form action={togglePermission}>
                      <input type="hidden" name="roleId" value={role.id} />
                      <input type="hidden" name="featureKey" value={feature.key} />
                      <input type="hidden" name="allowed" value={String(allowed)} />
                      <button type="submit"
                        className={`h-5 w-5 rounded border ${allowed ? "border-primary bg-primary" : "border-slate-300"}`}
                        aria-label={`${allowed ? "Revoke" : "Grant"} ${feature.label} for ${role.label}`} />
                    </form>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}