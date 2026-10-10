export type GoPackage = {
  id: string;
  importPath: string;
  displayName: string;
  description: string;
  category: 'Core' | 'Web' | 'Data' | 'Utils' | 'CLI';
  stars: string;
  size: string;
};

export const popularPackages: GoPackage[] = [
  { id: 'gin', importPath: 'github.com/gin-gonic/gin', displayName: 'Gin', description: 'Fast HTTP web framework', category: 'Web', stars: '78k', size: '1.2 MB' },
  { id: 'fiber', importPath: 'github.com/gofiber/fiber/v2', displayName: 'Fiber', description: 'Express inspired web framework', category: 'Web', stars: '34k', size: '980 KB' },
  { id: 'echo', importPath: 'github.com/labstack/echo/v4', displayName: 'Echo', description: 'Minimalist web framework', category: 'Web', stars: '30k', size: '850 KB' },
  { id: 'cobra', importPath: 'github.com/spf13/cobra', displayName: 'Cobra', description: 'CLI applications', category: 'CLI', stars: '37k', size: '420 KB' },
  { id: 'viper', importPath: 'github.com/spf13/viper', displayName: 'Viper', description: 'Configuration management', category: 'Utils', stars: '26k', size: '310 KB' },
  { id: 'gorm', importPath: 'gorm.io/gorm', displayName: 'GORM', description: 'ORM for Go', category: 'Data', stars: '38k', size: '1.1 MB' },
  { id: 'sqlx', importPath: 'github.com/jmoiron/sqlx', displayName: 'sqlx', description: 'Extensions to database/sql', category: 'Data', stars: '15k', size: '180 KB' },
  { id: 'testify', importPath: 'github.com/stretchr/testify', displayName: 'Testify', description: 'Assert and mock for testing', category: 'Utils', stars: '23k', size: '240 KB' },
  { id: 'go-redis', importPath: 'github.com/redis/go-redis/v9', displayName: 'go-redis', description: 'Redis client', category: 'Data', stars: '19k', size: '560 KB' },
  { id: 'jwt', importPath: 'github.com/golang-jwt/jwt/v5', displayName: 'jwt', description: 'JWT for Go', category: 'Utils', stars: '12k', size: '90 KB' },
  { id: 'uuid', importPath: 'github.com/google/uuid', displayName: 'uuid', description: 'UUID generation', category: 'Utils', stars: '9k', size: '45 KB' },
  { id: 'color', importPath: 'github.com/fatih/color', displayName: 'color', description: 'Colorize console output', category: 'CLI', stars: '5k', size: '38 KB' },
  { id: 'godotenv', importPath: 'github.com/joho/godotenv', displayName: 'godotenv', description: 'Load .env files', category: 'Utils', stars: '9k', size: '22 KB' },
  { id: 'chi', importPath: 'github.com/go-chi/chi/v5', displayName: 'Chi', description: 'Lightweight router', category: 'Web', stars: '17k', size: '110 KB' },
  { id: 'mux', importPath: 'github.com/gorilla/mux', displayName: 'gorilla/mux', description: 'Powerful HTTP router', category: 'Web', stars: '21k', size: '140 KB' },
  { id: 'zerolog', importPath: 'github.com/rs/zerolog', displayName: 'zerolog', description: 'Zero alloc JSON logger', category: 'Utils', stars: '11k', size: '180 KB' },
  { id: 'excelize', importPath: 'github.com/xuri/excelize/v2', displayName: 'excelize', description: 'Excel read and write', category: 'Data', stars: '12k', size: '3.2 MB' },
  { id: 'crypto', importPath: 'golang.org/x/crypto', displayName: 'x/crypto', description: 'Extra cryptography', category: 'Core', stars: '-', size: '1.4 MB' },
  { id: 'sys', importPath: 'golang.org/x/sys', displayName: 'x/sys', description: 'Low level OS sys', category: 'Core', stars: '-', size: '620 KB' },
  { id: 'sync', importPath: 'golang.org/x/sync', displayName: 'x/sync', description: 'Extra sync primitives', category: 'Core', stars: '-', size: '85 KB' },
];

export const categories = ['All', 'Core', 'Web', 'Data', 'Utils', 'CLI'] as const;
