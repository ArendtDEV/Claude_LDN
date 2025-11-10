import { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Users,
  BarChart3,
  Settings,
  PlusCircle,
  Trophy
} from 'lucide-react';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

export function Sidebar({ currentView, onNavigate }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set(['workspace']));

  const navItems: NavItem[] = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Home,
    },
    {
      id: 'workspace',
      label: 'Football Manager',
      icon: Trophy,
      children: [
        {
          id: 'players',
          label: 'Players Database',
          icon: Users,
        },
        {
          id: 'analytics',
          label: 'Analytics',
          icon: BarChart3,
        },
      ],
    },
  ];

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedItems(newExpanded);
  };

  const renderNavItem = (item: NavItem, level: number = 0) => {
    const Icon = item.icon;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expandedItems.has(item.id);
    const isActive = currentView === item.id;

    return (
      <div key={item.id}>
        <button
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onNavigate(item.id);
            }
          }}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all group
            ${isActive
              ? 'bg-gray-100 text-gray-900'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }
            ${isCollapsed ? 'justify-center' : ''}
          `}
          style={{ paddingLeft: isCollapsed ? '0.5rem' : `${0.5 + level * 0.75}rem` }}
        >
          {hasChildren && !isCollapsed && (
            <ChevronRight
              className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
            />
          )}
          <Icon className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && (
            <span className="flex-1 text-left truncate">{item.label}</span>
          )}
          {!isCollapsed && hasChildren && (
            <PlusCircle
              className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.stopPropagation();
                // Handle add new item
              }}
            />
          )}
        </button>

        {hasChildren && isExpanded && !isCollapsed && (
          <div className="mt-1">
            {item.children?.map(child => renderNavItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <aside
      className={`h-screen bg-gray-50 border-r border-gray-200 flex flex-col transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Header */}
      <div className="h-16 flex items-center justify-between px-3 border-b border-gray-200">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">X</span>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-gray-900">XITA LDN</h2>
              <p className="text-xs text-gray-500">Football Club</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 hover:bg-gray-200 rounded transition"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map(item => renderNavItem(item))}
      </nav>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3">
        <button
          onClick={() => onNavigate('settings')}
          className={`w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all
            text-gray-600 hover:bg-gray-100 hover:text-gray-900
            ${isCollapsed ? 'justify-center' : ''}
          `}
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!isCollapsed && <span>Settings</span>}
        </button>
      </div>
    </aside>
  );
}
