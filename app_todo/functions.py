def get_full_username(req):
    usr = req.user
    return f'{usr.first_name} {usr.last_name}'
