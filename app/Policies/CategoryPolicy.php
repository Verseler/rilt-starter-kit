<?php

namespace App\Policies;

use App\Models\Category;
use App\Models\User;

class CategoryPolicy
{
    /**
     * Determine whether the user can view any Categorys.
     */
    public function viewAny(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can view the Category.
     */
    public function view(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can create Categoriess.
     */
    public function create(User $user): bool
    {
        return $user->hasRole('admin') &&
            $user->can('create category');
    }

    /**
     * Determine whether the user can update the Category.
     */
    public function update(User $user): bool
    {
        return $user->hasRole('admin') &&
            $user->can('update category');
    }

    /**
     * Determine whether the user can delete the Category.
     */
    public function delete(User $user, Category $category): bool
    {
        return $user->hasRole('admin') &&
            $user->can('delete category');
    }

    /**
     * Determine whether the user can restore the Category.
     */
    public function restore(User $user, Category $Category): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the Category.
     */
    public function forceDelete(User $user, Category $Category): bool
    {
        return false;
    }
}
