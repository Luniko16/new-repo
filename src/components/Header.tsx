import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Palette, Eye, Download } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/builder', label: 'Builder', icon: FileText },
    { path: '/templates', label: 'Templates', icon: Palette },
    { path: '/preview', label: 'Preview', icon: Eye }
  ];

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-gray-900">AI Resume Builder</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location.pathname === path
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{label}</span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center space-x-4">
            <button className="btn btn-secondary flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;