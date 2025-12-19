"use client";

import { useEffect, useMemo, useState } from "react";
import { TopBar } from "@/components/top-bar";
import { TokenCard } from "@/components/token-card";
import { BottomNav } from "@/components/bottom-nav";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { ChevronRight, Star, Users, Calendar, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";

const menuItems = [
  { label: "My reviews", href: "/profile/reviews", icon: Star },
  { label: "Safety & Guidelines", href: "/profile/safety", icon: ShieldCheck },
  { label: "Settings", href: "/profile/settings", icon: null },
  { label: "Log out", href: "/logout", icon: null },
];

type ProfileRow = {
  id: string;
  display_name: string | null;
  city: string | null;
  area: string | null;
  avatar_path: string | null;

  verified_human: boolean;
  hosting_today: boolean;

  token_balance: number;

  met_count: number;
  avg_rating: number;
  review_count: number;
};

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [hostingToday, setHostingToday] = useState(false);

  const avatarUrl = useMemo(() => {
    if (!profile?.avatar_path) return "/man-profile.png";
    const { data } = supabase.storage.from("avatars").getPublicUrl(profile.avatar_path);
    return data.publicUrl || "/man-profile.png";
  }, [profile?.avatar_path]);

  const displayName = profile?.display_name?.trim() || "Your name";
  const cityLabel = profile?.city?.trim() || "Your city";
  const verified = !!profile?.verified_human;

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      setLoading(true);

      const { data: sessionRes, error: sessionErr } = await supabase.auth.getSession();
      if (sessionErr) console.error(sessionErr);

      const user = sessionRes.session?.user;
      if (!user) {
        if (mounted) {
          setProfile(null);
          setHostingToday(false);
          setLoading(false);
        }
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(
          "id, display_name, city, area, avatar_path, verified_human, hosting_today, token_balance, met_count, avg_rating, review_count"
        )
        .eq("id", user.id)
        .single();

      if (error) {
        console.error(error);
        if (mounted) {
          setProfile(null);
          setHostingToday(false);
          setLoading(false);
        }
        return;
      }

      if (mounted) {
        setProfile(data as ProfileRow);
        setHostingToday(!!(data as ProfileRow).hosting_today);
        setLoading(false);
      }
    }

    loadProfile();

    const { data: sub } = supabase.auth.onAuthStateChange(() => loadProfile());
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  async function handleToggle(nextValue: boolean) {
    setHostingToday(nextValue); // optimistic
    setSaving(true);

    const { data: sessionRes } = await supabase.auth.getSession();
    const user = sessionRes.session?.user;

    if (!user) {
      setSaving(false);
      return;
    }

    const { error } = await supabase
      .from("profiles")
      .update({ hosting_today: nextValue })
      .eq("id", user.id);

    if (error) {
      console.error(error);
      setHostingToday(!nextValue); // rollback
      alert("Failed to update availability.");
    } else {
      setProfile((prev) => (prev ? { ...prev, hosting_today: nextValue } : prev));
    }

    setSaving(false);
  }

  return (
    <div className="min-h-screen bg-background pb-24 max-w-[390px] mx-auto">
      <TopBar title="Profile" showBack />

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <div className="flex flex-col items-center text-center">
          <Avatar className="h-24 w-24 mb-3">
            <AvatarImage src={avatarUrl} alt={displayName} />
            <AvatarFallback>{(displayName?.[0] || "U").toUpperCase()}</AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-foreground">{displayName}</h2>
            <span className="text-sm text-muted-foreground">·</span>
            <span className="text-sm text-muted-foreground">{cityLabel}</span>
          </div>

          <div className="flex items-center gap-1 mt-1">
            <ShieldCheck className={`h-4 w-4 ${verified ? "text-success" : "text-muted-foreground"}`} />
            <span className={`text-sm font-medium ${verified ? "text-success" : "text-muted-foreground"}`}>
              {verified ? "Verified human" : "Not verified yet"}
            </span>
          </div>
        </div>

        {/* Hosting Toggle */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-accent">
          <span className="font-semibold text-foreground">I am available to host today</span>
          <Switch checked={hostingToday} disabled={loading || saving} onCheckedChange={handleToggle} />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Users className="h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold text-foreground">{profile?.met_count ?? 0}</p>
            <p className="text-xs text-muted-foreground text-center">Met travelers</p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Star className="h-5 w-5 text-yellow-400 mb-1" />
            <p className="text-2xl font-bold text-foreground">
              {profile?.avg_rating != null ? Number(profile.avg_rating).toFixed(1) : "0.0"}
            </p>
            <p className="text-xs text-muted-foreground text-center">
              Rating ({profile?.review_count ?? 0})
            </p>
          </div>

          <div className="flex flex-col items-center p-4 rounded-2xl bg-secondary">
            <Calendar className="h-5 w-5 text-primary mb-1" />
            <p className="text-2xl font-bold text-foreground">{profile?.review_count ?? 0}</p>
            <p className="text-xs text-muted-foreground text-center">Reviews</p>
          </div>
        </div>

        {/* Token Card */}
        <TokenCard balance={profile?.token_balance ?? 0} />

        {/* Menu List */}
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center justify-between p-4 rounded-xl hover:bg-accent transition-colors"
            >
              <div className="flex items-center gap-3">
                {item.icon && <item.icon className="h-5 w-5 text-muted-foreground" />}
                <span className="font-medium text-foreground">{item.label}</span>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}