import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, User, Building, DollarSign } from "lucide-react";
import { apiRequest } from "../lib/queryClient";
import { formatCurrency, formatDate } from "../lib/utils";

interface Lead {
  id: number;
  name: string;
  email: string | null;
  phone: string | null;
  company: string | null;
  source: string | null;
  status: string;
  expectedValue: string | null;
  notes: string | null;
  createdAt: string;
}

const statusColors: Record<string, string> = {
  new: "bg-blue-100 text-blue-700",
  contacted: "bg-yellow-100 text-yellow-700",
  qualified: "bg-green-100 text-green-700",
  proposal: "bg-purple-100 text-purple-700",
  negotiation: "bg-orange-100 text-orange-700",
  won: "bg-emerald-100 text-emerald-700",
  lost: "bg-red-100 text-red-700",
};

export default function Leads() {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    source: "",
    status: "new",
    expectedValue: "",
    notes: "",
  });

  const { data: leads = [], isLoading } = useQuery<Lead[]>({
    queryKey: ["/api/leads"],
    queryFn: async () => {
      const res = await fetch("/api/leads");
      return res.json();
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const res = await apiRequest("POST", "/api/leads", data);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/leads"] });
      setShowForm(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        company: "",
        source: "",
        status: "new",
        expectedValue: "",
        notes: "",
      });
    },
  });

  const filteredLeads = leads.filter(
    (l) =>
      l.name.toLowerCase().includes(search.toLowerCase()) ||
      l.company?.toLowerCase().includes(search.toLowerCase())
  );

  const leadsByStatus = {
    new: filteredLeads.filter((l) => l.status === "new"),
    contacted: filteredLeads.filter((l) => l.status === "contacted"),
    qualified: filteredLeads.filter((l) => l.status === "qualified"),
    proposal: filteredLeads.filter((l) => l.status === "proposal"),
    won: filteredLeads.filter((l) => l.status === "won"),
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">CRM / Leads</h1>
          <p className="text-muted-foreground">
            Manage your sales pipeline
          </p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
        >
          <Plus className="h-5 w-5" />
          Add Lead
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background"
        />
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-card p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add Lead</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                createMutation.mutate(formData);
              }}
              className="space-y-4"
            >
              <input
                type="text"
                placeholder="Contact Name *"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) =>
                    setFormData({ ...formData, company: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Source"
                  value={formData.source}
                  onChange={(e) =>
                    setFormData({ ...formData, source: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                />
                <input
                  type="number"
                  placeholder="Expected Value"
                  value={formData.expectedValue}
                  onChange={(e) =>
                    setFormData({ ...formData, expectedValue: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  step="0.01"
                />
              </div>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
              >
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="proposal">Proposal</option>
                <option value="negotiation">Negotiation</option>
                <option value="won">Won</option>
                <option value="lost">Lost</option>
              </select>
              <textarea
                placeholder="Notes"
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="w-full px-4 py-2 border rounded-lg"
                rows={2}
              />
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 px-4 py-2 border rounded-lg hover:bg-muted"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isLoading ? (
        <div className="text-center py-8">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {Object.entries(leadsByStatus).map(([status, statusLeads]) => (
            <div key={status} className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold capitalize">{status}</h3>
                <span className="text-sm text-muted-foreground">
                  {statusLeads.length}
                </span>
              </div>
              <div className="space-y-3">
                {statusLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-card border rounded-lg p-3 shadow-sm cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{lead.name}</span>
                    </div>
                    {lead.company && (
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <Building className="h-3 w-3" />
                        {lead.company}
                      </div>
                    )}
                    {lead.expectedValue && (
                      <div className="flex items-center gap-2 text-xs text-green-600">
                        <DollarSign className="h-3 w-3" />
                        {formatCurrency(lead.expectedValue)}
                      </div>
                    )}
                  </div>
                ))}
                {statusLeads.length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No leads
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
