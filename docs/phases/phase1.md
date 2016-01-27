# Phase 1: User Authentication and Flux Architecture (1.5 days)

## Rails
### Models
* User

### Controllers
* UsersController (create, new, show)
* SessionsController (create, new, destroy)

### Views
* users/new.html.erb
* sessions/new.html.erb
* static_pages/root.html.erb

## Flux
### Views (React Components)
* Profile
* Navbar

### Stores
* User

### Actions
* ApiActions.receiveUsers

### ApiUtil
* ApiUtil.fetchUser
* ApiUtil.updateUser

## Gems/Libraries
* BCrypt (Gem)
* Flux Dispatcher (npm)
