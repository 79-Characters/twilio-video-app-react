import { createTheme } from '@material-ui/core';

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    sidebarWidth: number;
    sidebarMobileHeight: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth: number;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    sidebarWidth?: number;
    sidebarMobileHeight?: number;
    brand: string;
    footerHeight: number;
    mobileTopBarHeight: number;
    mobileFooterHeight: number;
    sidebarMobilePadding: number;
    participantBorderWidth: number;
    rightDrawerWidth?: number;
  }
}

const defaultTheme = createTheme();

export default createTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': {
        'html, body, #root': {
          height: '100%',
        },
      },
    },
    MuiButton: {
      root: {
        borderRadius: '4px',
        textTransform: 'none',
        color: 'rgb(63, 131, 248)',
        // color: 'rgb(40, 42, 43)',
        fontSize: '0.9rem',
        transition: defaultTheme.transitions.create(['background-color', 'box-shadow', 'border', 'color'], {
          duration: defaultTheme.transitions.duration.short,
        }),
      },
      text: {
        padding: '6px 14px',
      },
      contained: {
        boxShadow: 'none',
        '&:hover': {
          boxShadow: 'none',
        },
      },
      outlinedPrimary: {
        border: '2px solid rgb(63, 131, 248)',
        '&:hover': {
          border: '2px solid rgb(1, 85, 137)',
        },
      },
      startIcon: {
        marginRight: '6px',
      },
    },
    MuiTypography: {
      body1: {
        color: 'rgb(40, 42, 43)',
        fontSize: '0.9rem',
      },
    },
    MuiInputBase: {
      root: {
        fontSize: '0.9rem',
      },
    },
    MuiSelect: {
      root: {
        padding: '0.85em',
      },
    },
    MuiDialogActions: {
      root: {
        padding: '16px',
      },
    },
    MuiTextField: {
      root: {
        color: 'rgb(40, 42, 43)',
      },
    },
    MuiInputLabel: {
      root: {
        color: 'rgb(40, 42, 43)',
        fontSize: '1.1rem',
        marginBottom: '0.2em',
        fontWeight: 500,
      },
    },
    MuiOutlinedInput: {
      notchedOutline: {
        borderColor: 'rgb(136, 140, 142)',
      },
    },
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
  palette: {
    primary: {
      main: 'rgb(63, 131, 248)',
    },
  },
  brand: '#E22525',
  footerHeight: 72,
  mobileFooterHeight: 56,
  sidebarWidth: 300,
  sidebarMobileHeight: 90,
  sidebarMobilePadding: 8,
  participantBorderWidth: 2,
  mobileTopBarHeight: 52,
  rightDrawerWidth: 320,
});
