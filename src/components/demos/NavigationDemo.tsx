
import * as React from 'react';
import { Navigation, type NavigationItemDef } from '@/components/mdui/navigation';
import { StarIcon, MailIcon, SettingsIcon, AccountCircleIcon } from '@/components/mdui/icons';

export function NavigationDemo() {
  const items: NavigationItemDef[] = [
    { id: 'home', icon: <StarIcon />, label: 'Home', badgeLabel: '', badgeType: 'small' },
    { id: 'mail', icon: <MailIcon />, label: 'Mail', badgeLabel: '99+', badgeType: 'large' },
    { id: 'settings', icon: <SettingsIcon />, label: 'Settings' },
    { id: 'profile', icon: <AccountCircleIcon />, label: 'Profile' },
  ];

  const [selectedItem, setSelectedItem] = React.useState<NavigationItemDef>(items[0]);
  const handleSelect = (selected: NavigationItemDef) => {
    setSelectedItem(selected);
  };

  return (
    <div className="flex flex-col gap-8 p-4">
      <div>
        <h2 className="text-lg font-semibold mb-4">Horizontal Navigation</h2>
        <Navigation variant="horizontal" items={items} value={selectedItem} onSelect={handleSelect} />
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-4">Vertical Navigation</h2>
        <Navigation variant="vertical" items={items} value={selectedItem} onSelect={handleSelect} />
      </div>
    </div>
  );
}
